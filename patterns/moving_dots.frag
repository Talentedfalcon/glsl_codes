#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(vec2 st,vec2 pos,float diameter){
    diameter/=2.;
    st-=pos;
    float pct=1.-smoothstep(diameter-0.001,diameter+0.001,sqrt(dot(st,st)));
    return pct;
}

vec2 moving_tile(vec2 st,vec2 scale,float speed){
    st*=scale;
    float x_clamp=clamp(mod(u_time*speed,2.),0.,1.);
    float y_clamp=clamp(mod(u_time*speed+1.,2.),0.,1.);

    if(step(1.,mod(st.y,2.0))==0.0){
        st.x+=x_clamp;
    }
    else{
        st.x-=x_clamp;
    }
    if(step(1.,mod(st.x,2.0))==0.0){
        st.y+=y_clamp;
    }
    else{
        st.y-=y_clamp;
    }
    return fract(st);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    st.x*=u_resolution.x/u_resolution.y;
    vec3 color=vec3(0.0);

    st=moving_tile(st,vec2(15.),1.);

    color+=1.-vec3(circle(st,vec2(0.5,0.5),0.6));

    gl_FragColor=vec4(color,1.0);
}