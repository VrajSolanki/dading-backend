 var Q = require('q');
 var  config = require('../config')
 const { Pool, Client } = require('pg')
 //var sma = require('sma');
 
exports.connestionPg = function(){
    var deferred = Q.defer();
    console.log("connecting to database...");
    

    const client = new Client(config.pg)
    client.connect()

    client.query('SELECT NOW()', (err, res) => {
    //console.log(err, res)
    client.end()
    })
    return deferred.promise;
}

exports.userLogin = function(userDetails){
 var deferred = Q.defer();
 const pool = new Pool(config.pg)

 pool.connect((err, client, done) => {
 
   const shouldAbort = (err) => {
     if (err) {
       console.error('Error in transaction', err.stack)
       client.query('ROLLBACK', (err) => {
         if (err) {
           console.error('Error rolling back client', err.stack)
           deferred.reject(err.stack);
         }
         // release the client back to the pool
         done()
       })
     }
     return !!err
   }
   const inputQuery = 'select id::character varying (250),first_name::character varying (250),last_name::character varying (250),phone::character varying (250),email::character varying (250),profile_image::character varying (250),work::character varying (250),education::character varying (250),industry::character varying (250),password::character varying (250),gender::character varying (250),dob::character varying (250),certificates::character varying[],fcm_id::character varying (250) from public.user where email = $1 AND password = $2';
   let value = [userDetails.email,userDetails.password];
   client.query('BEGIN', (err) => {
     if (shouldAbort(err)) return
     client.query(inputQuery, value, (err, res) => {
       if (shouldAbort(err)) return
       client.query('COMMIT', (err) => {
        if (err) {
          console.error('Error committing transaction', err.stack)
        }
        done()
        console.log("login result----->",res.rows);
        if(res &&res.rows.length)
          deferred.resolve(res.rows);
        else
          deferred.reject("invalide  credentials");
      })  
     })
   })
 })
 return deferred.promise;
}

exports.userRegister = function(userDetails){
var deferred = Q.defer();
const pool = new Pool(config.pg)

pool.connect((err, client, done) => {

  const shouldAbort = (err) => {
    if (err) {
      console.error('Error in transaction', err.stack)
      client.query('ROLLBACK', (err) => {
        if (err) {
          console.error('Error rolling back client', err.stack)
          deferred.reject(err.stack);
        }
        // release the client back to the pool
        done()
      })
    }
    return !!err
  }
  const inputQuery = 'INSERT INTO public.user(id,first_name,last_name,phone,email,profile_image,work,education,industry,	certificates,password,gender,dob) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)';
  let value = [userDetails.id,userDetails.first_name,userDetails.last_name,userDetails.phone,userDetails.email,userDetails.profile_image,userDetails.work,userDetails.education,userDetails.industry,userDetails.certificates,userDetails.password,userDetails.gender,userDetails.dob];
  client.query('BEGIN', (err) => {
    if (shouldAbort(err)) return
    client.query(inputQuery, value, (err, res) => {
      if (shouldAbort(err)) return
      client.query('COMMIT', (err) => {
       if (err) {
         console.error('Error committing transaction', err.stack)
       }
       done()
       deferred.resolve(res.rows);
     })  
    })
  })
})
  return deferred.promise;
}


function updateUserByID (id, cols) {
  delete  cols.userid;
  // Setup static beginning of query
  var query = ['UPDATE public.user'];
  query.push('SET');

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  Object.keys(cols).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 1) + ')'); 
   });
  query.push(set.join(', '));
  //id = id+'';
  // Add the WHERE statement to look up by id
  var count = Object.keys(cols).length;
  console.log("Json length : ",count);
  query.push('WHERE id = ($' + (count+1) + ')');

  // Return a complete query string
  return query.join(' ');
}

exports.userUpdate = function(userDetails){
  var deferred = Q.defer();
  const pool = new Pool(config.pg)
  
  pool.connect((err, client, done) => {
  
    const shouldAbort = (err) => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', (err) => {
          if (err) {
            console.error('Error rolling back client', err.stack)
            deferred.reject(err.stack);
          }
          // release the client back to the pool
          done()
        })
      }
      return !!err
    }
    let  userid = userDetails.userid;

    var query = updateUserByID(userDetails.userid, userDetails);
    console.log(query);
    // Turn req.body into an array of values
    delete userDetails.userid;
    console.log("userid--->",userDetails);

    var value = Object.keys(userDetails).map(function (key) {
      return userDetails[key];
    });
    value.push(userid);
    console.log(value);
    client.query('BEGIN', (err) => {
      if (shouldAbort(err)) return
      client.query(query, value, (err, res) => {
        if (shouldAbort(err)) return
        client.query('COMMIT', (err) => {
         if (err) {
           console.error('Error committing transaction', err.stack)
         }
         done()
         deferred.resolve(res.rows);
       })  
      })
    })
  })
    return deferred.promise;
  }

  
  exports.getUserById = function(userDetails){
    var deferred = Q.defer();
    const pool = new Pool(config.pg)
   
    pool.connect((err, client, done) => {
    
      const shouldAbort = (err) => {
        if (err) {
          console.error('Error in transaction', err.stack)
          client.query('ROLLBACK', (err) => {
            if (err) {
              console.error('Error rolling back client', err.stack)
              deferred.reject(err.stack);
            }
            // release the client back to the pool
            done()
          })
        }
        return !!err
      }
      const getQuery = 'select id::character varying (250),first_name::character varying (250),last_name::character varying (250),phone::character varying (250),email::character varying (250),profile_image::character varying (250),work::character varying (250),education::character varying (250),industry::character varying (250),password::character varying (250),gender::character varying (250),dob::character varying (250),certificates::character varying[] from public.user where id = $1';
      let value = [userDetails];
      client.query('BEGIN', (err) => {
        if (shouldAbort(err)) return
        client.query(getQuery, value, (err, res) => {
          if (shouldAbort(err)) return
          client.query('COMMIT', (err) => {
           if (err) {
             console.error('Error committing transaction', err.stack)
           }
           done()
           deferred.resolve(res.rows);
         })  
        })
      })
    })
    return deferred.promise;
   }

  exports.giveRatingToUser = function(userDetails){
    var deferred = Q.defer();
    const pool = new Pool(config.pg)
    
    pool.connect((err, client, done) => {
    
      const shouldAbort = (err) => {
        if (err) {
          console.error('Error in transaction', err.stack)
          client.query('ROLLBACK', (err) => {
            if (err) {
              console.error('Error rolling back client', err.stack)
              deferred.reject(err.stack);
            }
            // release the client back to the pool
            done()
          })
        }
        return !!err
      }
      const inputQueryRating = 'INSERT INTO public.rating(id,user_id,rating_knowledge,rating_comfort) VALUES($1,$2,$3,$4) RETURNING *';
      let value = [userDetails.rating_id,userDetails.user_id,userDetails.rating_knowledge,userDetails.rating_comfort];
      client.query('BEGIN', (err) => {
        if (shouldAbort(err)) return
        client.query(inputQueryRating, value, (err, res) => {
          if (shouldAbort(err)) return
          console.log(res.rows);
          var insertUserRatingQuery ='INSERT INTO public.mapping_user_rating(id,user_id,rating_id) VALUES($1,$2,$3)';
          let valueUserRating = [userDetails.user_rating_id,userDetails.id,res.rows[0].id];    
          client.query(insertUserRatingQuery, valueUserRating, (err, res) => {
            if (shouldAbort(err)) return
  
            client.query('COMMIT', (err) => {
             if (err) {
               console.error('Error committing transaction', err.stack)
             }
             done()
             deferred.resolve(res.rows);
           })  
          })  
        })
      })
    })
      return deferred.promise;
    }
    
    exports.addUserTopics = function(userDetails){
      var deferred = Q.defer();
      const pool = new Pool(config.pg)
      
      pool.connect((err, client, done) => {
      
        const shouldAbort = (err) => {
          if (err) {
            console.error('Error in transaction', err.stack)
            client.query('ROLLBACK', (err) => {
              if (err) {
                console.error('Error rolling back client', err.stack)
                deferred.reject(err.stack);
              }
              // release the client back to the pool
              done()
            })
          }
          return !!err
        }
        const inputQueryRating = 'INSERT INTO public.topic(id,profile_pic,name,sub_topic) VALUES($1,$2,$3,$4) RETURNING *';
        let value = [userDetails.topic_id,userDetails.profile_pic,userDetails.name,userDetails.sub_topic];
        client.query('BEGIN', (err) => {
          if (shouldAbort(err)) return
          client.query(inputQueryRating, value, (err, res) => {
            if (shouldAbort(err)) return
            console.log(res.rows);
            var insertUserRatingQuery ='INSERT INTO public.mapping_user_topic(id,user_id,topic_id) VALUES($1,$2,$3)';
            let valueUserRating = [userDetails.user_topic_id,userDetails.user_id,res.rows[0].id];    
            client.query(insertUserRatingQuery, valueUserRating, (err, res) => {
              if (shouldAbort(err)) return
    
              client.query('COMMIT', (err) => {
               if (err) {
                 console.error('Error committing transaction', err.stack)
               }
               done()
               deferred.resolve(res.rows);
             })  
            })  
          })
        })
      })
        return deferred.promise;
      }

exports.getRatingsByUserId = function(userDetails){
  var deferred = Q.defer();
  const pool = new Pool(config.pg)
 
  pool.connect((err, client, done) => {
  
    const shouldAbort = (err) => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', (err) => {
          if (err) {
            console.error('Error rolling back client', err.stack)
            deferred.reject(err.stack);
          }
          // release the client back to the pool
          done()
        })
      }
      return !!err
    }
    const getQuery = "select public.rating.user_id::character varying (250),public.rating.rating_knowledge::integer,public.rating.rating_comfort::integer from public.user,public.mapping_user_rating,public.rating where public.user.id = $1 and public.user.id = mapping_user_rating.user_id and mapping_user_rating.rating_id = public.rating.id";
    let value = [userDetails];
    client.query('BEGIN', (err) => {
      if (shouldAbort(err)) return
      client.query(getQuery, value, (err, res) => {
        if (shouldAbort(err)) return
        client.query('COMMIT', (err) => {
         if (err) {
           console.error('Error committing transaction', err.stack)
         }
         done()
         deferred.resolve(res.rows);
       })  
      })
    })
  })
  return deferred.promise;
 }


       exports.getTopicsByUserId = function(userDetails){
        var deferred = Q.defer();
        const pool = new Pool(config.pg)
       
        pool.connect((err, client, done) => {
        
          const shouldAbort = (err) => {
            if (err) {
              console.error('Error in transaction', err.stack)
              client.query('ROLLBACK', (err) => {
                if (err) {
                  console.error('Error rolling back client', err.stack)
                  deferred.reject(err.stack);
                }
                // release the client back to the pool
                done()
              })
            }
            return !!err
          }
          const getQuery = "select public.topic.id::character varying (250), public.topic.name::character varying (250),public.topic.profile_pic::character varying (250) from public.user,public.mapping_user_topic,public.topic where public.user.id = $1 and public.user.id = mapping_user_topic.user_id and mapping_user_topic.topic_id = public.topic.id";
          let value = [userDetails];
          client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return
            client.query(getQuery, value, (err, res) => {
              if (shouldAbort(err)) return
              client.query('COMMIT', (err) => {
               if (err) {
                 console.error('Error committing transaction', err.stack)
               }
               done()
               deferred.resolve(res.rows);
             })  
            })
          })
        })
        return deferred.promise;
       }
    
       exports.addConnection = function(userDetails){
        var deferred = Q.defer();
        const pool = new Pool(config.pg)
        
        pool.connect((err, client, done) => {
        
          const shouldAbort = (err) => {
            if (err) {
              console.error('Error in transaction', err.stack)
              client.query('ROLLBACK', (err) => {
                if (err) {
                  console.error('Error rolling back client', err.stack)
                  deferred.reject(err.stack);
                }
                // release the client back to the pool
                done()
              })
            }
            return !!err
          }
          const inputQuery = 'INSERT INTO public.connection(id,sender,receiver,initiate,status) VALUES($1,$2,$3,$4) RETURNING *';
          let value = [userDetails.id,userDetails.sender,userDetails.receiver,new Date(),userDetails.status];
          client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return
            client.query(inputQuery, value, (err, res) => {
              if (shouldAbort(err)) return
              client.query('COMMIT', (err) => {
               if (err) {
                 console.error('Error committing transaction', err.stack)
               }
               done()
               deferred.resolve(res.rows);
             })  
            })
          })
        })
          return deferred.promise;
        }

       
      exports.updateConnectionStatus = function(userDetails){
        var deferred = Q.defer();
        const pool = new Pool(config.pg)
        
        pool.connect((err, client, done) => {
        
          const shouldAbort = (err) => {
            if (err) {
              console.error('Error in transaction', err.stack)
              client.query('ROLLBACK', (err) => {
                if (err) {
                  console.error('Error rolling back client', err.stack)
                  deferred.reject(err.stack);
                }
                // release the client back to the pool
                done()
              })
            }
            return !!err
          }
          const updateQuery = "update public.connection set status = $1 where id = $2";
          let value = [userDetails.status,userDetails.connection_id];
          client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return
            client.query(updateQuery, value, (err, res) => {
              if (shouldAbort(err)) return
              client.query('COMMIT', (err) => {
                if (err) {
                  console.error('Error committing transaction', err.stack)
                }
                done()
                deferred.resolve(res.rows);
              })  
            })
          })
        })
          return deferred.promise;
        }

        exports.search = function(userDetails){
          var deferred = Q.defer();
          const pool = new Pool(config.pg)
         
          pool.connect((err, client, done) => {
          
            const shouldAbort = (err) => {
              if (err) {
                console.error('Error in transaction', err.stack)
                client.query('ROLLBACK', (err) => {
                  if (err) {
                    console.error('Error rolling back client', err.stack)
                    deferred.reject(err.stack);
                  }
                  // release the client back to the pool
                  done()
                })
              }
              return !!err
            }
            const getQuery = "select public.topic.id::character varying (250), public.topic.name::character varying (250),public.topic.profile_pic::character varying (250),public.user.id::character varying (250),public.user.first_name::character varying (250),public.user.last_name::character varying (250),public.user.profile_image::character varying (250) from public.user,public.mapping_user_topic,public.topic where public.topic.name like $1 and public.user.id = mapping_user_topic.user_id and mapping_user_topic.topic_id = public.topic.id";
            let value = [`%${userDetails}%`];
            client.query('BEGIN', (err) => {
              if (shouldAbort(err)) return
              client.query(getQuery, value, (err, res) => {
                if (shouldAbort(err)) return
                client.query('COMMIT', (err) => {
                 if (err) {
                   console.error('Error committing transaction', err.stack)
                 }
                 done()
                 deferred.resolve(res.rows);
               })  
              })
            })
          })
          return deferred.promise;
         }
  
   exports.getRecommendation = function(userDetails){
        var deferred = Q.defer();
        const pool = new Pool(config.pg)
       
        pool.connect((err, client, done) => {
        
          const shouldAbort = (err) => {
            if (err) {
              console.error('Error in transaction', err.stack)
              client.query('ROLLBACK', (err) => {
                if (err) {
                  console.error('Error rolling back client', err.stack)
                  deferred.reject(err.stack);
                }
                // release the client back to the pool
                done()
              })
            }
            return !!err
          }
          const getQuery = "select public.topic.sub_topic::character varying (250) from public.user,public.mapping_user_topic,public.topic where public.user.id = $1 and public.user.id = mapping_user_topic.user_id and mapping_user_topic.topic_id = public.topic.id";
          let value = [userDetails];
          client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return
            client.query(getQuery, value, (err, res) => {
              if (shouldAbort(err)) return
              client.query('COMMIT', (err) => {
               if (err) {
                 console.error('Error committing transaction', err.stack)
               }
               done()
               deferred.resolve(res.rows);
             })  
            })
          })
        })
        return deferred.promise;
       }


   exports.getTrenDingers = function(){
        var deferred = Q.defer();
        const pool = new Pool(config.pg)
       
        pool.connect((err, client, done) => {
        
          const shouldAbort = (err) => {
            if (err) {
              console.error('Error in transaction', err.stack)
              client.query('ROLLBACK', (err) => {
                if (err) {
                  console.error('Error rolling back client', err.stack)
                  deferred.reject(err.stack);
                }
                // release the client back to the pool
                done()
              })
            }
            return !!err
          }
          const getQuery = "select public.user.id::character varying (250),public.user.profile_image::character varying (250),public.user.first_name::character varying (250),public.user.last_name::character varying (250),public.user.level::character varying (250),public.user.coins::integer from public.user ORDER BY public.user.coins DESC LIMIT 8";
          // let value = [userDetails];
          client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return
            client.query(getQuery,(err, res) => {
              if (shouldAbort(err)) return
              client.query('COMMIT', (err) => {
               if (err) {
                 console.error('Error committing transaction', err.stack)
               }
               done()
               deferred.resolve(res.rows);
             })  
            })
          })
        })
        return deferred.promise;
       }

exports.getAchievementByUserId = function(userDetails){
  var deferred = Q.defer();
  const pool = new Pool(config.pg)
 
  pool.connect((err, client, done) => {
  
    const shouldAbort = (err) => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', (err) => {
          if (err) {
            console.error('Error rolling back client', err.stack)
            deferred.reject(err.stack);
          }
          // release the client back to the pool
          done()
        })
      }
      return !!err
    }
    const getQuery = "select public.achievement.id::character varying (250),public.achievement.name::character varying (250),public.achievement.image::character varying (250) from public.user,public.mapping_achievement_user,public.achievement where public.user.id = $1 and public.user.id = mapping_achievement_user.user_id and mapping_achievement_user.achievement_id = public.achievement.id";
    let value = [userDetails];
    client.query('BEGIN', (err) => {
      if (shouldAbort(err)) return
      client.query(getQuery, value, (err, res) => {
        if (shouldAbort(err)) return
        client.query('COMMIT', (err) => {
         if (err) {
           console.error('Error committing transaction', err.stack)
         }
         done()
         deferred.resolve(res.rows);
       })  
      })
    })
  })
  return deferred.promise;
 }

exports.addConversation = function(userDetails){
  var deferred = Q.defer();
  const pool = new Pool(config.pg)

  pool.connect((err, client, done) => {

    const shouldAbort = (err) => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', (err) => {
          if (err) {
            console.error('Error rolling back client', err.stack)
            deferred.reject(err.stack);
          }
          // release the client back to the pool
          done()
        })
      }
      return !!err
    }
  const inputQuery = 'INSERT INTO public.conversation(id,sender,reciever,start) VALUES($1,$2,$3,$4) RETURNING *';
    let value = [userDetails.id,userDetails.sender,userDetails.reciever,new Date(userDetails.start)];
    client.query('BEGIN', (err) => {
      if (shouldAbort(err)) return
      client.query(inputQuery, value, (err, res) => {
        if (shouldAbort(err)) return
        client.query('COMMIT', (err) => {
         if (err) {
           console.error('Error committing transaction', err.stack)
         }
         done()
         deferred.resolve(res.rows);
       })  
      })
    })
  })
  return deferred.promise;
}

exports.updateConversation = function(userDetails){
  var deferred = Q.defer();
  const pool = new Pool(config.pg)

  pool.connect((err, client, done) => {

    const shouldAbort = (err) => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', (err) => {
          if (err) {
            console.error('Error rolling back client', err.stack)
            deferred.reject(err.stack);
          }
          // release the client back to the pool
          done()
        })
      }
      return !!err
    }
    const updateQuery = "update public.conversation set enddate = $1 where id = $2";
    let value = [new Date(userDetails.enddate),userDetails.conversation_id];
    client.query('BEGIN', (err) => {
      if (shouldAbort(err)) return
      client.query(updateQuery, value, (err, res) => {
        if (shouldAbort(err)) return
        client.query('COMMIT', (err) => {
          if (err) {
            console.error('Error committing transaction', err.stack)
          }
          done()
          deferred.resolve(res.rows);
        })  
      })
    })
  })
  return deferred.promise;
}

exports.connectionSortAndFilter = function(userDetails){
  var deferred = Q.defer();
  const pool = new Pool(config.pg)
  pool.connect((err, client, done) => {

    const shouldAbort = (err) => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', (err) => {
          if (err) {
            console.error('Error rolling back client', err.stack)
            deferred.reject(err.stack);
          }
          // release the client back to the pool
          done()
        })
      }
      return !!err
    }
    let one=false,
    two=false,
    three=false;
    let valueArr = [];
    let getQuery = "select DISTINCT public.user.id::character varying (250),public.user.profile_image::character varying (250),public.user.first_name::character varying (250),public.user.last_name::character varying (250) from public.rating,public.mapping_user_rating,public.user,public.connection,public.mapping_user_topic,public.topic where public.user.id = public.mapping_user_rating.user_id";
    if(userDetails.rating){
      getQuery = getQuery + " and public.mapping_user_rating.rating_id = public.rating.id";
    }
    if(userDetails.conversation){
      getQuery = getQuery + "";
    }
    if(userDetails.topics){
      getQuery = getQuery + " and public.user.id = public.mapping_user_topic.user_id and public.mapping_user_topic.topic_id = public.topic.id and public.topic.name in ($1)";
      one = true;
      valueArr.push(userDetails.topics);
    }
    if(userDetails.expertLevel){
      if(!one){
        getQuery = getQuery + " and public.rating.rating_knowledge = $1";
        valueArr.push(userDetails.expertLevel);
        one = true;
      }else{
        getQuery = getQuery + " and public.rating.rating_knowledge = $2";
        two = true;
        valueArr.push(userDetails.expertLevel);
      }
    }
    if(userDetails.comfertLevel){
      if(!one){
        getQuery = getQuery + " and public.rating.rating_comfort = $1";
        valueArr.push(userDetails.comfertLevel);
        one = true;
      }else if(!two){
        getQuery = getQuery + " and public.rating.rating_comfort = $2";
        valueArr.push(userDetails.comfertLevel);
        two = true;
      }else if(!three){
        getQuery = getQuery + " and public.rating.rating_comfort = $3";
        valueArr.push(userDetails.comfertLevel);
      }
    }
    console.log(getQuery);
    console.log(valueArr);
    let value = valueArr;
    client.query('BEGIN', (err) => {
      if (shouldAbort(err)) return
      client.query(getQuery, value,(err, res) => {
        if (shouldAbort(err)) return
        client.query('COMMIT', (err) => {
          if (err) {
            console.error('Error committing transaction', err.stack)
          }
          done()
          deferred.resolve(res.rows);
        })  
      })
    })
  })
  return deferred.promise;
}